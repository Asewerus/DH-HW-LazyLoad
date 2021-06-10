import React, { Suspense } from 'react'
import { isNil } from 'lodash'
import { FileZipOutlined, FileJpgOutlined, FileTextOutlined } from '@ant-design/icons'
import { Folder } from './Folder'
import { loadData } from '../utils'
import { IData } from '../types'
import { ICON_SIZE, MARGIN_RIGHT } from '../constants/constants'

enum FileType {
        JPG = '.jpg',
        EPUB = '.epub',
        ZIP = '.zip',
}

type IProps = {
        id: number
        toggleLoading: () => void
}

type IState = {
        data: IData
}

class List extends React.Component<IProps, IState> {

        state = {
                data: {} as IData
        }

        componentDidMount() {
                this.props.toggleLoading()

                loadData(this.props.id)
                        .then((data) => {
                                this.setState({
                                        data
                                }, this.props.toggleLoading)
                        })
        }


        renderTitle = (title: string) => {
                let icon: JSX.Element | null;
                switch (true) {
                        case title.indexOf(FileType.ZIP) !== -1:
                                icon = <FileZipOutlined style={{ fontSize: ICON_SIZE, marginRight: MARGIN_RIGHT }} />
                                break
                        case title.indexOf(FileType.EPUB) !== -1:
                                icon = <FileTextOutlined style={{ fontSize: ICON_SIZE, marginRight: MARGIN_RIGHT }} />
                                break
                        case title.indexOf(FileType.JPG) !== -1:
                                icon = <FileJpgOutlined style={{ fontSize: ICON_SIZE, marginRight: MARGIN_RIGHT }} />
                                break
                        default:
                                icon = null
                                break
                }
                return (
                        <>
                                {icon}
                                {title}
                        </>
                )
        }

        renderList = () => {
                const { children } = this.state.data;

                const list = children?.map((child: IData) => {
                        if (!isNil(child.children)) {
                                return <div key={child.id}> <Folder data={child} /></div>;
                        }

                        return <li key={child.id}>{this.renderTitle(child.title)}</li>
                });

                return list;
        };

        render() {
                const { data } = this.state;

                if (!data) {
                        return null
                }

                return (
                        <ul>
                                {this.renderList()}
                        </ul>
                )
        }
}

export default List