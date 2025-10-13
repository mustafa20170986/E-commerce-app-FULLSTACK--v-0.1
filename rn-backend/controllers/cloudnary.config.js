import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({
cloud_name:'df7hplo8x',
api_key:'455639776624244',
api_secret:'ifLQBtYlj4cwm9o2gbjFMPgDcl4'
})

export default cloudinary



