import React, { createContext } from "react";
import axios from 'axios';
import app from "firebase/app";
import "firebase/auth";

export const FirebaseContext = createContext(null);

// Component wrapper for Firebase context consumer
// Wrapped Components will have access to the Firebase class in props
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {Firebase => <Component {...props} Firebase={Firebase} />}
    </FirebaseContext.Consumer>
);

// Use this class to access the Firebase SDK
export default class Firebase {
    constructor() {
        app.initializeApp({
            apiKey: "AIzaSyDquzusXH3lKgpG1zZwv5rFUgf_AzdxsS0",
            authDomain: "study-buddy-d452c.firebaseapp.com",
            projectId: "study-buddy-d452c",
            storageBucket: "study-buddy-d452c.appspot.com",
            messagingSenderId: "195455297769",
            appId: "1:195455297769:web:c1ccd9b05339120e3ca878",
            measurementId: "G-05ZPZB8NB3"
        });
        this.auth = app.auth();
        this.claims = null;
        this.baseAPI = "http://localhost:5001/study-buddy-d452c/us-central1/api"; // testing API (npm run serve)
        // this.baseAPI = "https://us-central1-study-buddy-d452c.cloudfunctions.net/api" // deployed API
    }

    async register(data, password) {
        try {
            await this.auth.createUserWithEmailAndPassword(data.email, password);
            // await this.auth.currentUser.sendEmailVerification();
            // console.log(`Verification email sent to ${data.email}.`);
            await axios.post(`${this.baseAPI}/user/register`, data);
            return this.auth.currentUser;
        } catch (error) {
            return error;
        }
    }

    // Must be logged in as an admin to add a new admin
    async addAdmin(email, password) {
        try {
            const isAdmin = (await this.getClaims()).admin;
            if (isAdmin) {
                const token = await this.auth.currentUser.getIdToken();
                const data = {"email": email, "token": token};
                await this.auth.createUserWithEmailAndPassword(email, password);
                // await this.auth.currentUser.sendEmailVerification();
                // console.log(`Verification email sent to ${email}.`);
                await axios.post(`${this.baseAPI}/user/newAdmin`, data);
                return this.auth.currentUser;
            }
        } catch (error) {
            return error;
        }
    }

    async login(email, password) {
        try {
            await this.auth.signInWithEmailAndPassword(email, password);
            return this.auth.currentUser;
        } catch (error) {
            return error;
        }
    }

    async logout() {
        try {
            this.claims = null;
            return await this.auth.signOut();
        } catch (error) {
            return error;
        }
    }

    async resetPassword(email) {
        try {
            return await this.auth.sendPasswordResetEmail(email);
        } catch (error) {
            return error;
        }
    }

    async confirmReset(code, password) {
        try {
            return await this.auth.confirmPasswordReset(code, password);
        } catch (error) {
            return error;
        }
    }

    // Access user's custom claims
    // https://firebase.google.com/docs/auth/admin/custom-claims
    async getClaims() {
        return (
          await this.auth.currentUser
            .getIdTokenResult(true)
            .catch(err => console.error(err))
        ).claims;
    }
    // getClaims() {
    //     const claims = {"student": true, "admin": true, "tutor": true};
    //     return claims;
    // }
};
