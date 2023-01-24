import React from 'react';
import BaseWidget from 'web-shell-core/widgets/BaseWidget';
import { Typeahead } from '@cgds/typeahead';
import { Field } from '@cgds/field';
import { Card, CardCollection } from '@cgds/card';
import { Stack } from '@cgds/stack';
import * as utility from '@cgds/utility-css';
import { Theme } from '@design-systems/theme';

// eslint-disable-next-line valid-jsdoc
/**
 * Entry point into the products page for tradamarket
 */

const suggestedWords = [
  'Apple',
  'Apricots',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blackberries',
  'Blueberries',
  'Breadfruit',
  'Cantaloupe',
  'Cherry',
  'Durian',
  'Grape',
  'Lemon',
  'Mango',
];
export default class ProductTypeWidget extends BaseWidget {
  /**
   * Mounts the component, see React docs.
   * @returns {void}
   */
  componentDidMount() {
    this.ready();
  }

  /**
   * Renders the widget
   * @returns {void} -
   */
  render() {
    // const { sandbox } = this.props;
    return (
      <Theme theme="quickbooks">
        <div style={{ padding: '20px' }}>
          TEST
          <CardCollection size="medium">
            <Card>
              <Stack
                direction="column"
                align="center"
                justify="center"
                gap={10}
                className={utility.p12}
              >
                <div>Medium Card</div>
              </Stack>
            </Card>
            <Card>
              <Stack
                direction="column"
                align="center"
                justify="center"
                gap={10}
                className={utility.p12}
              >
                <div>
                  <Field
                    style={{
                      width: '300px',
                    }}
                  >
                    <Typeahead
                      aria-label="Fruit"
                      filterFn={(search) => {
                        return suggestedWords.filter((e) =>
                          e
                            .toLowerCase()
                            .startsWith(search.substring(0, 1).toLowerCase()),
                        );
                      }}
                      theme="quickbooks"
                      limit={10}
                      options={suggestedWords}
                      placeholder="Search..."
                    />
                  </Field>
                </div>
              </Stack>
            </Card>
          </CardCollection>
        </div>
      </Theme>
    );
  }
}
