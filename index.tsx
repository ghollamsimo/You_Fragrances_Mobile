import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import App from './App';

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

registerRootComponent(Root);
