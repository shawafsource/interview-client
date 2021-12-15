import React, { useState } from 'react';
import parse from 'html-react-parser';

export function Company({ name, employees, overview, products }) {
  const [show, setShow] = useState(false);

  const productsName = products.map((product) => product.name);
  return (
    <>
      <td>{name}</td>
      <td>{employees ? employees : 'N/A'}</td>
      <td className={'row'}>
        <div className={show ? '' : 'overview'}>{parse(overview)}</div>
        <button
          className={'showMore'}
          onClick={() => {
            setShow((s) => !s);
          }}
        >
          {show ? '... show less' : '... show more'}
        </button>
      </td>
      <td>{productsName.length > 0 ? productsName.join(', ') : 'N/A'}</td>
    </>
  );
}
