export class Config{

    public static serverUrl;

    public static _initialize(){
        if(process.env.NODE_ENV === "production"){
            Config.serverUrl="https://itay-fintek.herokuapp.com";
        }

        else{
            Config.serverUrl="http://localhost:3000";
        }
    }
}

Config._initialize();