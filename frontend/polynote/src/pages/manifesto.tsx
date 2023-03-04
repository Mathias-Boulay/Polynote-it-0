import { Button, Layout, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { Link } from 'react-router-dom';

export function ManifestoPage() {
  return (
    <main>
      <Layout>
        <Typography>
          <Title>Manifesto</Title>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula eros a sodales dignissim. Quisque ac
            augue accumsan, egestas arcu ut, interdum augue. Nulla quis rutrum velit, non commodo quam. Praesent porta
            lacinia lacus, sed facilisis libero euismod a. Nam vitae tincidunt nibh. Cras maximus euismod arcu a congue.
            Aliquam quis enim sit amet sapien pulvinar aliquet id ac lorem. Duis placerat, nunc sed consequat sodales,
            velit diam rhoncus nulla, sed ornare nunc tellus sit amet eros. Suspendisse sed convallis nisi, at commodo
            lacus. Pellentesque tempus lacinia nunc, pellentesque posuere sem aliquet ac. Morbi sed mollis tellus, eget
            vehicula metus. Ut et dictum turpis, vitae rhoncus quam. Sed nec quam lobortis, viverra urna in, gravida
            orci. Donec efficitur tellus in lorem scelerisque ornare. Mauris eu metus accumsan odio eleifend fermentum
            vel non purus.
          </Paragraph>
        </Typography>
        <Link to='login'>
          <Button type='primary' block>
            Primary Button
          </Button>
        </Link>
      </Layout>
    </main>
  );
}
