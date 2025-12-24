import { Header } from './components/Header/Header';
import { Filter } from './components/Filter/Filter';
import { List } from './components/List/List';
import { Footer } from './components/Footer/Footer';
import { Layout } from './components/Layout/Layout';
import { Aside } from './components/Aside/Aside';

import { FilterProvide } from './components';
import { Suspense } from 'react';

import LoadingThreeDotsJumping from './components/LoadingThreeDotsJumping/LoadingThreeDotsJumping';

import {
  AppGrid,
  HeaderArea,
  AsideArea,
  SectionArea,
  FooterArea,
} from './LayoutRoot.styles';
import Task from './components/Task/Task';
import TaskList from './components/TaskList/TaskList';

function App() {
  return (
    <FilterProvide>
      <AppGrid>
        <HeaderArea>
          <Header />
        </HeaderArea>

        <AsideArea>
          <Aside>
            <Filter />
            <List />
          </Aside>
        </AsideArea>

        <SectionArea>
          <Layout>
            <Suspense fallback={<LoadingThreeDotsJumping />}>
              <Task />
              <TaskList />
            </Suspense>
          </Layout>
        </SectionArea>

        <FooterArea>
          <Footer />
        </FooterArea>
      </AppGrid>
    </FilterProvide>
  );
}

export default App;
