import React, { createContext } from "react";
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
    }

    async signup(email, password) {
        try {
            await this.auth.createUserWithEmailAndPassword(email, password);
            await this.auth.currentUser.sendEmailVerification();
            console.log(`Verification email sent to ${email}.`);
            return this.auth.currentUser;
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

    getClaims() {
        const claims = {"student": true, "admin": true, "tutor": true};
        return claims;
    }
    // Access user's custom claims
    // https://firebase.google.com/docs/auth/admin/custom-claims
    // async getClaims() {
    //     try {
    //         const { claims } = await this.auth.currentUser.getIdTokenResult(true);
    //         console.log(claims);
    //         return claims;
    //     } catch (error) {
    //         return error;
    //     }
    // };
};
