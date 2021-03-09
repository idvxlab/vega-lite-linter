import axios from "axios";
import {url} from './url';

const getLinter = async (spec) => axios ({
    "method": "POST",
    "url": url + "/lint",
    "headers": {
        "Content-Type": "application/json; charset=urf-8"
    },
    "data":{
        "spec": spec
    }
})

export default getLinter;