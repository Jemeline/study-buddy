import React, {useState} from 'react';
import ReactLoading from 'react-loading';
import {Input,InputGroup,InputGroupAddon,FormText} from 'reactstrap';
import {apiGetCoursesBySubject} from '../../utils/api';
import Course from './Course.component';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {colorPalette} from '../../utils/design';
import {zeroPad} from '../../utils/common';
import {validateCourseInput} from '../../utils/regex';
import CourseTickers from './CourseTickers'

function CourseSearchImproved({courseSchedule,setCourseSchedule}){
    const [courses, setCourses] = useState([]);
    const [filteredCourses,setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [courseInput, setCourseInput] = useState('');
    const [notFound, setNotFound] = useState('');

    return <div>
            <InputGroup style={{margin: "auto"}}>
                <Input
                    type="text"
                    placeholder="Search For Your Courses Here"
                    value={courseInput}
                    onChange={async (e) => {
                        setNotFound('');
                        setCourseInput(e.target.value);
                        if (validateCourseInput(e.target.value)){
                            if (CourseTickers.includes(e.target.value.slice(0,5).toUpperCase())) {
                                setNotFound('');
                                await fetchCourses(e.target.value,setLoading,setCourses,setError,setFilteredCourses,setNotFound);
                            } else if (e.target.value.length > 4) {
                                filterCourses(e.target.value,setLoading,setFilteredCourses,setError,courses,setNotFound);
                            } else {
                                setNotFound('');
                            }
                        }
                    }}
                    valid={(validateCourseInput(courseInput))&&(CourseTickers.includes(courseInput.slice(0,4).toUpperCase()) || CourseTickers.includes(courseInput.slice(0,3).toUpperCase()))}
                    invalid={courseInput.length > 0 && !((validateCourseInput(courseInput))&&(CourseTickers.includes(courseInput.slice(0,4).toUpperCase()) || CourseTickers.includes(courseInput.slice(0,3).toUpperCase())))}
                />
                <InputGroupAddon addonType="append">
                    <Button
                        size="small"
                        style={{backgroundColor:colorPalette.secondaryB,color:colorPalette.white}}
                        onClick={async () => {setCourseInput("");setFilteredCourses([]);setError(false);setNotFound('');setLoading(false)}}
                    > Clear</Button>
                </InputGroupAddon>
            </InputGroup>
            <FormText>Ex: COMP 523, CHEM 101-001, CHEM 262L-002, AMST</FormText>
            <br></br>
            <div style={{height:'60vh'}}>
            {error && <div>
                <h6>Something went wrong...</h6>
                <Button
                        size="small"
                        disabled={!error}
                        style={{backgroundColor:colorPalette.secondaryB,color:colorPalette.white}}
                        onClick={async () => {setCourseInput("");setFilteredCourses([]);setError(false);setNotFound('');setLoading(false)}}
                > Try Again</Button>
            </div>} 
            {loading ? (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ReactLoading type={"cylon"} color={"#000080"} height={'15%'} width={'15%'} /> 
            </div>) : 
            (
            <div>
                <h6><em>{notFound}</em></h6>
            <div style={{flexGrow: 1,height:'60vh',overflowY:'auto'}}><Grid
                container
                direction="row"
                justify="flex-start"
                spacing={1}
            >
            {filteredCourses.map(item => (
                <Grid item xs={12} sm={6} md={3} key={item._id}  >
                    <Course course={item} courseSchedule={courseSchedule} setCourseSchedule={setCourseSchedule} hideAddButton={false}></Course>
                </Grid>
            ))}
            </Grid></div></div>)}   
            </div>  
    </div>
};

function filterCourses(searchString,setLoading,setFilteredCourses,setError,courses,setNotFound) {
    try {
        setNotFound('') ;
        setLoading(true);
        let arr;
        if (searchString.length < 11) {
            const splitArr = searchString.split(" ");
            const isHonors = splitArr[1].includes('H');
            const isLab = splitArr[1].includes('L');
            arr = courses.filter(function (element) {
                return (isHonors) ? element.courseNumber.toString().includes(splitArr[1].replace(/\D/g, "")) && element.courseIsHonors 
                : (isLab) ? element.courseIsLab && element.courseNumber.toString().includes(splitArr[1].replace(/\D/g, ""))
                : element.courseNumber.toString().includes(splitArr[1].replace(/\D/g, ""))
            })       
        } 
        else if (searchString.length >= 11){
            const splitArrSpace = searchString.split(" ")[1].split("-");
            const splitArrDash = searchString.split("-");
            const isHonors = splitArrSpace[1].includes('H');
            const isLab = splitArrSpace[1].includes('L');
            arr = courses.filter(function (element) {
                return (isHonors) ? element.courseNumber.toString().includes(splitArrSpace[0].replace(/\D/g, "")) && element.courseIsHonors && zeroPad(element.courseSection,3).toString().includes(splitArrDash[1])
                : (isLab) ? element.courseNumber.toString().includes(splitArrSpace[0].replace(/\D/g, "")) && element.courseIsLab && zeroPad(element.courseSection,3).toString().includes(splitArrDash[1])
                : element.courseNumber.toString().includes(splitArrSpace[0].replace(/\D/g, "")) && zeroPad(element.courseSection,3).toString().includes(splitArrDash[1])
            })
        }
        if(arr.length === 0 && courses.length>0){
            setNotFound(`Could not find course: ${searchString.toUpperCase()}`)
        } else {
            setNotFound('') 
        }
        setFilteredCourses(arr);
        setLoading(false);
    } catch (error){
        setError(true);
        setLoading(false);
        setNotFound('');
        console.log(error);
    };
};

async function fetchCourses(subject,setLoading,setCourses,setError,setFilteredCourses,setNotFound){
    try{
        setNotFound('');
        setLoading(true);
        setError(false);
        const data = await apiGetCoursesBySubject(subject.slice(0,4));
        setFilteredCourses(data.data);
        setCourses(data.data);
        setLoading(false);
    } catch (error){
        setError(true);
        setLoading(false);
        setNotFound('');
        console.log(error);
    };
};

export default CourseSearchImproved;