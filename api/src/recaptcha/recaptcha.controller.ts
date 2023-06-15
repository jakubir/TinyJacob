import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
require('dotenv').config()

@Controller('recaptcha')
export class RecaptchaController{
    @Post()
    async uploadVer(@Body() par): Promise<boolean> {
        let result = false;
        await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.APP_SECRET_KEY}&response=${par.token}`)
            .then((res) => {
                if (res.data.success === true)
                    result = true;
            })
            .catch((error) => {
                console.log(error);
            })
        return result;
    }
}

