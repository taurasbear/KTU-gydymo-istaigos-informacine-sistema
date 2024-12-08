import { fetchData } from '../util/apiCalls';

export const hasPermission = async (user, requiredUserType) => {
    if (!user) {
        return false;
    }
    
    let userTypes = [];

    await fetchData('/api/naudotojotipas', (data) => {
        userTypes = data;
    });

    console.log(userTypes);

    const userIndex = userTypes.indexOf(user.naudotojo_tipas);
    const requiredIndex = userTypes.indexOf(requiredUserType);
    return userIndex >= requiredIndex;
};