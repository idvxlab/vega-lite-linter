import axios from "axios";
import {url} from './url';

const getFixer = async (spec) => axios ({
    "method": "POST",
    "url": url + "/fix",
    "headers": {
        "Content-Type": "application/json; ccharset=urf-8"
    },
    "data":{
        "spec": spec
    }
})

export default getFixer;