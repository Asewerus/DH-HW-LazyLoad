import React from 'react'
import { LoadingOutlined, CaretRightOutlined, FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { IData } from '../types'
import { ICON_SIZE } from '../constants/constants'
import styles from '../style/style.css'

const LoadableList = React.lazy(() => import(
        /* webpackMode: "lazy" */
        /* webpackPrefetch: true */
        /* webpackPreload: true */
        /* webpackChunkName: "list" */ './List'));

enum Rotate {
        HORIZONT = 0,
        VERTICAL = 90
}

type IProps = {
        data: IData | null
}

type IState = {
        isOpen: Boolean
        isLoadingList: Boolean
}

export class Folder extends React.Component<IProps, IState> {

        state = {
                isOpen: false,
                isLoadingList: false,
        };

        handleClick = (): void => {
                this.setState((prevState: Readonly<IState>) => ({
                        isOpen: !prevState.isOpen
                }))
        }

        handleToggleLoader = (): void => {
                this.setState((prevState: Readonly<IState>) => ({
                        isLoadingList: !prevState.isLoadingList
                }))
        }

        render() {
                const { data } = this.props;
                const { isOpen, isLoadingList } = this.state;

                if (!data) {
                        return <LoadingOutlined spin style={{ fontSize: ICON_SIZE }} />;
                }

                return (
                        <div key={data.id} className={styles.menu}>
                                <span onClick={this.handleClick}>
                                        {isLoadingList
                                                ? <LoadingOutlined
                                                        style={{ fontSize: ICON_SIZE }}
                                                        spin
                                                />
                                                : <CaretRightOutlined
                                                        style={{ fontSize: ICON_SIZE }}
                                                        rotate={isOpen ? Rotate.VERTICAL : Rotate.HORIZONT}
                                                />
                                        }
                                        {isOpen
                                                ? <FolderOpenOutlined style={{ fontSize: ICON_SIZE, margin: '0 2px' }} />
                                                : <FolderOutlined style={{ fontSize: ICON_SIZE, margin: '0 2px' }} />
                                        }
                                        <span>
                                                {data.title}
                                        </span>
                                </span>
                                {isOpen && (
                                        <React.Suspense fallback={() => <> </>}>
                                                <LoadableList id={data.id} toggleLoading={this.handleToggleLoader} />
                                        </React.Suspense>
                                )}
                        </div>
                )
        }
}