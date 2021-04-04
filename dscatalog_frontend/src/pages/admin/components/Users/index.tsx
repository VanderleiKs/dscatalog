import {Switch, Route} from 'react-router-dom';
import ListUsers from './ListUsers';

const Users = () => (
    <>
        <Switch>
            <Route path="/admin/users" exact>
                <ListUsers />
            </Route>
            <Route path="/admin/users/:userId">
                <h1>Area de cadastro</h1>
            </Route>
        </Switch>
    </>
);
export default Users;
