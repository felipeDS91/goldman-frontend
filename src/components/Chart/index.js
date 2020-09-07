import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Brush,
  AreaChart,
  Area,
} from 'recharts';
import PropTypes from 'prop-types';

import { formatPrice } from '~/util/format';
import { Container, Description } from './styles';

export default function Chart({
  description,
  data,
  onChangeBrush,
  brushStartIndex,
}) {
  let x = 'x';
  let y = 'y';

  if (data.length > 0) [x, y] = Object.keys(data[0]);

  return (
    <Container>
      {description && <Description>{description}</Description>}
      <div className="line-charts">
        <div className="line-chart-wrapper">
          <LineChart
            width={760}
            height={320}
            data={data}
            margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey={x} />
            <YAxis
              domain={['auto', 'auto']}
              allowDecimals
              tickFormatter={v => formatPrice(v)}
              tickCount={8}
            />
            <Tooltip
              wrapperStyle={{
                borderColor: 'white',
                boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
              }}
              label="Total"
              formatter={v => formatPrice(v)}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              labelStyle={{ fontWeight: 'bold', color: '#666666' }}
            />
            <Line dataKey={y} stroke="#ff7300" dot />
            <Brush
              dataKey={x}
              startIndex={brushStartIndex}
              onChange={e => onChangeBrush && onChangeBrush(e)}
            >
              <AreaChart>
                <CartesianGrid />
                <YAxis hide domain={['auto', 'auto']} />
                <Area dataKey={y} stroke="#ff7300" fill="#ff7300" dot />
              </AreaChart>
            </Brush>
          </LineChart>
        </div>
      </div>
    </Container>
  );
}

Chart.propTypes = {
  description: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  onChangeBrush: PropTypes.func,
  brushStartIndex: PropTypes.number,
};

Chart.defaultProps = {
  description: null,
  data: [],
  onChangeBrush: () => {},
  brushStartIndex: 1,
};
