import React, { Component } from 'react';
import { Images } from '../components/Images';
import { forEach, map } from 'lodash';
import './HouseMap.css';
import Paper from '@material-ui/core/Paper';
import uuidv1 from 'uuid/v1';

export default class HouseMap extends Component {
    state = {
        template: null
    };

    buildHouseMapElement = field => {
        const { data } = this.props;
        switch (field) {
            case 'full_address':
                return <h3 key={uuidv1()}>{data['full_address']}</h3>;
            case 'price':
                return <h3 key={uuidv1()}>{data['price']}</h3>;
            case 'area':
                return <h3 key={uuidv1()}>{data['area']}</h3>;
            default:
                return null;
        }
    };

    renderHouseMap = template => {
        const { data } = this.props;
        let renderArr = [];
        forEach(template, item =>
            item.field === 'images'
                ? renderArr.push(
                      <Images
                          key={uuidv1()}
                          childrenFields={map(
                              item.children,
                              (_, index) =>
                                  data[`${item.children[index].field}`]
                          )}
                          images={data['images']}
                      />
                  )
                : renderArr.push(this.buildHouseMapElement(item.field))
        );
        return (
            <Paper key={uuidv1()} className='HouseMap'>
                {renderArr}
            </Paper>
        );
    };

    render() {
        const { template } = this.props;
        return this.renderHouseMap(template);
    }
}
