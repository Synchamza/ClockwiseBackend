import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const createZoomMeeting = async (startTime, access_token) => {
    const token = access_token
    // console.log(token, '====>>>> token')
    const url = 'https://api.zoom.us/v2/users/me/meetings';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const meetingDetails = {
        topic: 'Client Meeting',
        type: 2,  // Scheduled meeting
        start_time: startTime,  // ISO 8601 format: '2024-06-01T10:00:00Z'
        duration: 60,  // 60 minutes
        timezone: 'UTC',
        agenda: 'Discuss project updates',
        settings: {
            host_video: true,
            participant_video: true,
            join_before_host: false,
            mute_upon_entry: true,
            waiting_room: true
        }
    };

    try {
        const response = await axios.post(url, meetingDetails, { headers });
        // console.log(response.data)
        return response.data.join_url;
    } catch (error) {
        console.error('Error creating Zoom meeting:', error, "===>>> erororororor");
        throw error;
    }
};


export const zoomMeetCreate = async (req, res, next) => {
    const { email, startTime, access_token } = req.body;

    if (!email || !startTime) {
        return res.status(400).send('Email and start time are required');
    }

    try {
        const meetingLink = await createZoomMeeting(startTime, access_token);
        // await sendEmail(email, meetingLink);
        res.status(200).send({
            status: "success",
            message: "Meeting created and email sent successfully",
            data: meetingLink
        });
    } catch (error) {
        res.status(500).send('Error creating meeting or sending email');
    }
}

export const zoomAuth = async (req, res, next) => {
    const clientId = process.env.ZOOM_API_KEY;
    const redirect_uri = process.env.REDIRECT_URI;
    console.log(redirect_uri)
    const responseType = 'code';
    const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirect_uri}`;
    res.status(200).send({
        status: "success",
        data: authorizationUrl
    })
    // res.redirect(authorizationUrl);
}

export const zoomCallback = async (req, res, next) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('No code provided');
    }
    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REDIRECT_URI
            }, headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data, "====>>> this is data")
        res.status(200).json({
            status: "success",
            data: response.data
        });
    } catch (error) {
        console.error('Error:', error);
        res.send('Error obtaining token');
    }
}


export const zoomRefreshToken = async (req, res, next) => {
    try {
        const refresh_token = req.query.refreshToken;

        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        res.json(response.data);

    } catch (error) {
        console.error('Error', error);
        res.send('Error refreshing token')
    }
}

