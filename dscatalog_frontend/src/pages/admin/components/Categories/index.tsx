import { Route, Switch } from "react-router";
import FormCategory from "./FormCategory";
import ListCategories from "./ListCategories";

const Categories = () => (
    <>
        <Switch>
            <Route path="/admin/categories" exact>
                <ListCategories />
            </Route>
            <Route path="/admin/categories/:categoryId">
                <FormCategory />
            </Route>
        </Switch>
    </>
);

export default Categories;