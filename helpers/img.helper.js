import axios from 'axios';
import fs from 'fs'
import { logger } from './logger.helper.js';

export const getImage = async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://picsum.photos/200',
        headers: { },
        responseType: 'arraybuffer'
      };
      
      const img = await axios.request(config)
      .then((response) => {
       return response.data
      })
      .catch((error) => {
        logger.error(error);
      });
      fs.writeFile('./buffer.jpg',img , 'binary' ,(err) => {
        if (err) return logger.error(err);
    });
}