import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import PageNotFound from '~/pages/PageNotFound';
import Home from '~/pages/Home';
import ListCustomers from '~/pages/List/Customer';
import FormCustomer from '~/pages/Form/Customer';
import FormChangePassword from '~/pages/Form/ChangePassword';
import ListUsers from '~/pages/List/User';
import FormUser from '~/pages/Form/User';
import ListPaymentType from '~/pages/List/PaymentType';
import FormPaymentType from '~/pages/Form/PaymentType';
import ListStatus from '~/pages/List/Status';
import FormStatus from '~/pages/Form/Status';
import ListOrders from '~/pages/List/Order';
import FormOrder from '~/pages/Form/Order';
import ListFinishing from '~/pages/List/Finishing';
import FormFinishing from '~/pages/Form/Finishing';
import ListMaterials from '~/pages/List/Material';
import FormMaterial from '~/pages/Form/Material';
import ListColors from '~/pages/List/Color';
import FormColor from '~/pages/Form/Color';
import ListCarriers from '~/pages/List/Carrier';
import FormCarrier from '~/pages/Form/Carrier';
import ListFreightTypes from '~/pages/List/FreightType';
import FormFreightType from '~/pages/Form/FreightType';
import FormCompany from '~/pages/Form/Company';
import PrintOrder from '~/pages/Form/Order/Print';
import ReportOrder from '~/pages/Report/Order';
import ReportCustomer from '~/pages/Report/Customer';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" component={Home} isPrivate />

      <Route path="/company" component={FormCompany} isPrivate />

      <Route path="/list-orders" component={ListOrders} isPrivate />
      <Route path="/order" exact component={FormOrder} isPrivate />
      <Route path="/order/:id" exact component={FormOrder} isPrivate />
      <Route path="/print-order/:id" exact component={PrintOrder} isPrivate />

      <Route path="/list-customers" component={ListCustomers} isPrivate />
      <Route path="/customer" exact component={FormCustomer} isPrivate />
      <Route path="/customer/:id" exact component={FormCustomer} isPrivate />

      <Route path="/list-payment-type" component={ListPaymentType} isPrivate />
      <Route path="/payment-type" exact component={FormPaymentType} isPrivate />
      <Route
        path="/payment-type/:id"
        exact
        component={FormPaymentType}
        isPrivate
      />

      <Route path="/list-status" component={ListStatus} isPrivate />
      <Route path="/status" exact component={FormStatus} isPrivate />
      <Route path="/status/:id" exact component={FormStatus} isPrivate />

      <Route path="/list-finishings" component={ListFinishing} isPrivate />
      <Route path="/finishing" exact component={FormFinishing} isPrivate />
      <Route path="/finishing/:id" exact component={FormFinishing} isPrivate />

      <Route path="/list-materials" component={ListMaterials} isPrivate />
      <Route path="/material" exact component={FormMaterial} isPrivate />
      <Route path="/material/:id" exact component={FormMaterial} isPrivate />

      <Route path="/list-colors" component={ListColors} isPrivate />
      <Route path="/color" exact component={FormColor} isPrivate />
      <Route path="/color/:id" exact component={FormColor} isPrivate />

      <Route path="/list-carriers" component={ListCarriers} isPrivate />
      <Route path="/carrier" exact component={FormCarrier} isPrivate />
      <Route path="/carrier/:id" exact component={FormCarrier} isPrivate />

      <Route
        path="/list-freight-types"
        component={ListFreightTypes}
        isPrivate
      />
      <Route path="/freight-type" exact component={FormFreightType} isPrivate />
      <Route
        path="/freight-type/:id"
        exact
        component={FormFreightType}
        isPrivate
      />

      <Route path="/list-users" component={ListUsers} isPrivate />
      <Route path="/user" exact component={FormUser} isPrivate />
      <Route path="/user/:id" exact component={FormUser} isPrivate />

      <Route
        path="/change-password"
        exact
        component={FormChangePassword}
        isPrivate
      />

      <Route path="/report-order" exact component={ReportOrder} isPrivate />
      <Route
        path="/report-customer"
        exact
        component={ReportCustomer}
        isPrivate
      />

      <Route path="*" exact component={PageNotFound} isPrivate />
    </Switch>
  );
}
