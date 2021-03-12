import React, {useState,useEffect} from 'react';
import ReactLoading from 'react-loading';
import {Input,Container,InputGroup,InputGroupAddon,FormText} from 'reactstrap';
import {apiGetCourses} from '../../utils/api';
import _ from "lodash";
import Course from './Course.component';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {colorPalette} from '../../utils/design';
import {zeroPad} from '../../utils/common';

function CourseSearch(){
    const [courses, setCourses] = useState([]);
    const [filteredCourses,setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [courseInput, setCourseInput] = useState('');

    useEffect(async ()=>{
        const fetchCourses = async ()=>{
            try{
                setLoading(true);
                setError(false);
                const data = await apiGetCourses();
                setCourses(data.data);
                setLoading(false);
            } catch (error){
                setError(true);
                console.log(error);
            };
        };
        fetchCourses();
    }, []);
    
    return <div>
        <Container >
            <InputGroup style={{margin: "auto"}}>
                <Input
                    type="text"
                    placeholder="Search For Your Class Here"
                    value={courseInput}
                    onChange={async (e) => {
                        if (setFilteredCourses.length === 0){
                            setCourseInput(e.target.value);
                        } else {
                            setCourseInput(e.target.value);
                            if (e.target.value.length >=4){
                                await onChange(e,courses,setFilteredCourses);
                            } else {
                                setFilteredCourses([]);
                            }  
                        }
                    }}
                    disabled={loading} 
                />
                <InputGroupAddon addonType="append">
                    <Button
                        size="small"
                        disabled={loading}
                        style={{backgroundColor:colorPalette.secondaryA}}
                        onClick={async () => {setCourseInput("");setFilteredCourses([])}}
                    > Clear</Button>
                </InputGroupAddon>
            </InputGroup>
            <FormText>Ex: COMP 523, CHEM 101-001, Principles of Biol</FormText>
            <br></br>
            {error && <div>Something went wrong ...</div>} 
            {loading ? (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ReactLoading type={"cylon"} color={"#000080"} height={'15%'} width={'15%'} /> 
            </div>) : 
            (<div style={{flexGrow: 1}}><Grid
                container
                direction="row"
                justify="left"
                spacing={1}

            >
            {filteredCourses.map(item => (
                <Grid item xs={12} sm={6} md={3} key={item._id}  >
                    <Course course={item}></Course>
                </Grid>
            ))}
            </Grid></div>)} 
        </Container>    
    </div>
};

const onChange = async (event,courses,setFilteredCourses) => {
    event.persist();
    const debouncedFn =  _.debounce(() => {
        let searchString = event.target.value;
        fetchCourses(searchString,courses,setFilteredCourses);
    }, 700);
    await debouncedFn();
};

function fetchCourses(searchString,courses,setFilteredCourses) {
    const arr = courses.filter(function (element) {
        return (searchString.split("-").length > 1) ? (element.courseNumber.toString().includes(searchString.split("-")[0].replace(/\D/g, "")) &&
    element.courseSubject.includes(searchString.replace(/[^a-zA-Z]/g,'').toUpperCase()) && zeroPad(element.courseSection,3).toString().includes(searchString.split("-")[1])) : (element.courseNumber.toString().includes(searchString.replace(/\D/g, "")) &&
    element.courseSubject.includes(searchString.replace(/[^a-zA-Z]/g,'').toUpperCase())) || element.courseTitle.includes(searchString.toUpperCase())
    });
    setFilteredCourses(arr);
};

export default CourseSearch;