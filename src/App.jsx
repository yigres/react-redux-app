import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchCustomers } from './asyncActions/customers';
import { addCashAction, getCashAction } from './store/cashReduser';
import { addCustomerAction, removeCustomerAction } from './store/customerReduser';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);

  const addCash = (cash) => {
    dispatch(addCashAction(cash));
  }

  const getCash = (cash) => {
    dispatch(getCashAction(cash));
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer));
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  }

  return (
    <div className="app">
      <div className="cash">{cash}</div>
      <div className="btns">
        <button className="btn" onClick={() => addCash(Number(prompt()))}>Пополнить счет</button>
        <button className="btn" onClick={() => getCash(Number(prompt()))}>Снять со счета</button>
        <button className="btn" onClick={() => addCustomer(prompt())}>Добавить клиента</button>
        <button className="btn" onClick={() => dispatch(fetchCustomers())}>Получить клиетов из базы</button>
      </div>
      {customers.length > 0 ?
        <div className="customers">
          {customers.map(customer =>
            <div onClick={() => removeCustomer(customer)} className="customer">{customer.name}</div>)}
        </div>
        :
        <div className="customers">
          <div className="customer">
            No clients!
          </div>
        </div>
      }
    </div>
  );
}

export default App;
