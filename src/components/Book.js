import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const Book = ({book}) => {
    return(
        <div>
            <Card>
                <CardImg top width="100%" src={book.volumeInfo.imageLinks} alt={`Cover image of ${book.volumeInfo.title}`} />
                <CardBody>
                    <CardTitle tag="h5">{book.volumeInfo.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{book.volumeInfo.authors}</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default Book;