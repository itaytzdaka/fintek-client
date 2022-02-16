import axios, { AxiosError } from "axios";
import { ForecastModel } from "../models/forecast-model"
import { Config } from "../config";


//get forecast with api request
export function getForecast(city) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await
                axios.get<ForecastModel>(`${Config.serverUrl}/api/forecast/${city}`);

            //checking if result not match with the search
            let include=false;
            city.split("-").forEach((name) => {
                if (response.data.location.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
                    include=true;
                }
            });

            if(!include){
                throw "Didn't find anything";
            }

            resolve(response.data);
        }

        catch (err) {

            switch ((err as AxiosError).response?.data || err) {
                case "Request failed with status code 400":
                    reject("Didn't find anything");
                    break;

                case "Didn't find anything":
                    reject("Didn't find anything");
                    break;

                default:
                    reject("Error");
                    break;
            }
        }
    });



}