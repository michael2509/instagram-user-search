import { username, password } from './config';
import { connect, disconnect } from 'mongoose';
import User from './models/user.model';

const saveToDB = async (userData) => {
    connect(`mongodb://${username}:${password}@ds127545.mlab.com:27545/search-users`, {useNewUrlParser: true}, (err) => {if(err) throw new Error(err);})

    await User.create(userData, (err) => {
        if(err) throw new Error(err);
    })

}

export default saveToDB;