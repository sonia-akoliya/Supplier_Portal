import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchRegistrationUser = createAsyncThunk(
    "get-registration-users",
    async ({ body }, thunkArgs) => {
        try {
            const response = await axios.post(
                'https://localhost:44300/api/FirstPage/registration',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

export default fetchRegistrationUser;
