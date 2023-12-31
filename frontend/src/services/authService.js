import axios from "axios";
import { toast } from 'react-toastify'

const BACKEND_URL = "http://localhost:5000";


export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}


// register user 
export const register = async (userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/register`,
            userData,
            {
                withCredentials: true,

            }
        );

        // Check if the status code is in the 2xx range (indicating success)
        if (response.status >= 200 && response.status < 300) {
            toast.success('Registered successfully');
        } else {
            toast.error('Failed to register');
        }

        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};



// login user
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/login`,
            userData
        );

        // Check if the status code is in the 2xx range (indicating success)
        if (response.status >= 200 && response.status < 300) {
            toast.success('user loggedIn successfully');
        } else {
            toast.error('Failed to register');
        }

        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};


// logout user
export const logOutUser = async () => {
    try {
        await axios.get(
            `${BACKEND_URL}/api/users/logout`,
        );

    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};



// forgot password
export const forgotPassword = async (userData) => {
    try {
        await axios.post(
            `${BACKEND_URL}/api/users/forgotpassword`, userData
        );
        toast.success(response.data.message)

    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};


// reset password
export const resetPassword = async (userData, resetToken) => {
    try {
        await axios.put(
            `${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData
        );
        return response.data

    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};



// login status
export const getLoginStatus = async (userData, resetToken) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/users/loggedin`
        );
        return response.data

    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
};

