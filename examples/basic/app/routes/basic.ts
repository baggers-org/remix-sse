import { LoaderFunction } from '@remix-run/node';

import { EventStream } from '../../../../src/server';
export const loader: LoaderFunction = ({ request }) => {
  return new EventStream(request, (send) => {
    let gIndex = 0;
    let g = setInterval(() => {
      gIndex += 1;
      send('greeting', JSON.stringify({ hello: 'world', index: gIndex }));
    }, 1000);

    let q = setInterval(() => {
      send('question', JSON.stringify({ question: 'what is your name?' }));
    }, 5000);

    return async () => {
      clearInterval(g);
      clearInterval(q);
    };
  });
};
