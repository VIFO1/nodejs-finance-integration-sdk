import VifoAutheticate from "../Modules/Services/VifoAuthenticate";
import HeaderLoginInterface from "../Modules/Interfaces/HeaderLoginInterface";
import BodyAutheticaterface from "../Modules/Interfaces/BodyAutheticaterface";
async function testLogin() {
    const loginResult = new VifoAutheticate();
    const headers: HeaderLoginInterface= {
        Accept:'',
        'Accept-Encoding': '',
        'Accept-Language': ''
    };
    const body:BodyAutheticaterface = 
    {
        username: '',
        password: ''
    }
    const result = await loginResult.authenticateUser(headers,body);
    console.log(result);
    
}

testLogin();