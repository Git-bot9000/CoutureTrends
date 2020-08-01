import React, {Component} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component{
  
  render(){
		return (
			<Provider store={store}>
				<BrowserRouter>
					<PersistGate persistor = {persistor}>
						<div>
							<Main />
						</div>
					</PersistGate>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
