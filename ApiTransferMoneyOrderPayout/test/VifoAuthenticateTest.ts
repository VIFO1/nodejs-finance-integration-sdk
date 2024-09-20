import VifoAutheticate from "../Modules/Services/VifoAuthenticate";

async function testLogin() {
    const loginResult = new VifoAutheticate();
    const result = await loginResult.authenticateUser({},'trung123','123456');
    console.log(result);
    
}

testLogin();