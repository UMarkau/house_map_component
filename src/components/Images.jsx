import React, { PureComponent } from 'react';
import { forEach, map } from 'lodash';
import './Images.css';
import uuidv1 from 'uuid/v1';

export class Images extends PureComponent {
    renderImageChildren = childrenFields => {
        return (
            <ul className='Image__child'>
                {map(childrenFields, child => (
                    <li key={uuidv1()}>{child}</li>
                ))}
            </ul>
        );
    };

    renderImages = images => {
        const { childrenFields } = this.props;
        let imagesArr = [];
        forEach(images, image =>
            imagesArr.push(
                <img key={uuidv1()} className='Image' alt='' src={image} />
            )
        );
        return (
            <div className='ImageContainer'>
                {childrenFields && childrenFields.length
                    ? this.renderImageChildren(childrenFields)
                    : null}
                {imagesArr}
            </div>
        );
    };

    render() {
        const { images } = this.props;
        return this.renderImages(images);
    }
}
