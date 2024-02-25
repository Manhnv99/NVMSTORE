
import axios from "axios";


class LocationAPI {
    getAllProvinces=()=>{
        return axios.get(`http://localhost:8080/api/location/get-all-provinces`);
    }

    getAllDistrictsByCode=(province_code)=>{
        return axios.get(`http://localhost:8080/api/location/get-all-districts-by-province-code`,{
            params:{
                province_code:province_code
            }
        });
    }

    getAllWardsByCode=(district_code)=>{
        return axios.get(`http://localhost:8080/api/location/get-all-wards-by-district-code`,{
            params:{
                district_code:district_code
            }
        });
    }
}

export default new LocationAPI()