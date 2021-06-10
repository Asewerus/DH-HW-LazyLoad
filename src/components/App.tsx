import React, { Suspense } from 'react';
import { isEmpty } from 'lodash'
import { Folder } from './Folder'
import { loadData } from '../utils'
import { IData } from '../types'

type IState = {
        data: IData
}

class App extends React.Component<{}, IState> {

        state = {
                data: {} as IData
        }

        componentDidMount() {
                loadData()
                        .then((data) => {
                                this.setState({
                                        data
                                })
                        })
        };

        render() {
                const { data } = this.state;

                if (isEmpty(data)) {
                        return null;
                }

                return data.children?.map((child: IData) => <Folder data={child} />);
        };
}
export default App;