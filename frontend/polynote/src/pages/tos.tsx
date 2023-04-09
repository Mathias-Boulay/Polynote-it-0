import { Typography } from 'antd';
import React from 'react';
import Layout, { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { BasicHeader } from '../components/headers/BasicHeader';

export function Tos() {
  return (
    <Layout>
      <Content>
        <BasicHeader />
        <Typography>
          <Title level={1}>Website Terms and Conditions of Use</Title>

          <Title level={2}>1. Terms</Title>

          <Paragraph>
            By accessing this Website, accessible from https://polynotes.com, you are agreeing to be bound by these
            Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable
            local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The
            materials contained in this Website are protected by copyright and trade mark law.
          </Paragraph>

          <Title level={2}>2. Use License</Title>

          <Paragraph>
            Permission is granted to temporarily download one copy of the materials on Polynotes's Website for personal,
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under
            this license you may not:
          </Paragraph>

          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose or for any public display;</li>
            <li>attempt to reverse engineer any software contained on Polynotes's Website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <Paragraph>
            This will let Polynotes to terminate upon violations of any of these restrictions. Upon termination, your
            viewing right will also be terminated and you should destroy any downloaded materials in your possession
            whether it is printed or electronic format.
          </Paragraph>

          <Title level={2}>3. Disclaimer</Title>

          <Paragraph>
            All the materials on Polynotes's Website are provided "as is". Polynotes makes no warranties, may it be
            expressed or implied, therefore negates all other warranties. Furthermore, Polynotes does not make any
            representations concerning the accuracy or reliability of the use of the materials on its Website or
            otherwise relating to such materials or any sites linked to this Website.
          </Paragraph>

          <Title level={2}>4. Limitations</Title>

          <Paragraph>
            Polynotes or its suppliers will not be hold accountable for any damages that will arise with the use or
            inability to use the materials on Polynotes's Website, even if Polynotes or an authorize representative of
            this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does
            not allow limitations on implied warranties or limitations of liability for incidental damages, these
            limitations may not apply to you.
          </Paragraph>

          <Title level={2}>5. Revisions and Errata</Title>

          <Paragraph>
            The materials appearing on Polynotes's Website may include technical, typographical, or photographic errors.
            Polynotes will not promise that any of the materials in this Website are accurate, complete, or current.
            Polynotes may change the materials contained on its Website at any time without notice. Polynotes does not
            make any commitment to update the materials.
          </Paragraph>

          <Title level={2}>6. Links</Title>

          <Paragraph>
            Polynotes has not reviewed all of the sites linked to its Website and is not responsible for the contents of
            any such linked site. The presence of any link does not imply endorsement by Polynotes of the site. The use
            of any linked website is at the user's own risk.
          </Paragraph>

          <Title level={2}>7. Site Terms of Use Modifications</Title>

          <Paragraph>
            Polynotes may revise these Terms of Use for its Website at any time without prior notice. By using this
            Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
          </Paragraph>

          <Title level={2}>8. Your Privacy</Title>

          <Paragraph>Please read our Privacy Policy.</Paragraph>

          <Title level={2}>9. Governing Law</Title>

          <Paragraph>
            Any claim related to Polynotes's Website shall be governed by the laws of fr without regards to its conflict
            of law provisions.
          </Paragraph>
        </Typography>
      </Content>
    </Layout>
  );
}
