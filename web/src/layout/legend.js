/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3-scale';

import { dispatchApplication } from '../store';
import { updateApplication } from '../actioncreators';
import { __ } from '../helpers/translation';

import HorizontalColorbar from '../components/horizontalcolorbar';
import { getCo2Scale, solarColor, windColor } from '../helpers/scales';
import { co2Sub } from '../helpers/formatting';

// TODO: Move styles from styles.css to here
// TODO: Remove all unecessary id and class tags

const mapStateToProps = state => ({
  co2ColorbarValue: state.application.co2ColorbarValue,
  colorBlindModeEnabled: state.application.colorBlindModeEnabled,
  legendVisible: state.application.legendVisible,
  solarColorbarValue: state.application.solarColorbarValue,
  solarEnabled: state.application.solarEnabled,
  windColorbarValue: state.application.windColorbarValue,
  windEnabled: state.application.windEnabled,
});

const Legend = ({
  co2ColorbarValue,
  colorBlindModeEnabled,
  legendVisible,
  solarColorbarValue,
  solarEnabled,
  windColorbarValue,
  windEnabled,
}) => {
  const mobileCollapsedClass = !legendVisible ? 'mobile-collapsed' : '';
  const toggleLegend = () => {
    dispatchApplication('legendVisible', !legendVisible);
  };

  return (
    <div className={`floating-legend-container ${mobileCollapsedClass}`}>
      <div className="floating-legend-mobile-header">
        <span>{__('misc.legend')}</span>
        <i className="material-icons toggle-legend-button" onClick={toggleLegend}>
          {legendVisible ? 'call_received' : 'call_made'}
        </i>
      </div>
      {legendVisible && (
        <React.Fragment>
          {windEnabled && (
            <div className={`wind-potential-legend floating-legend ${mobileCollapsedClass}`}>
              <div className="legend-header">
                {__('legends.windpotential')}<small> (m/s)</small>
              </div>
              <HorizontalColorbar
                id="wind-potential-bar"
                colorScale={windColor}
                currentValue={windColorbarValue}
                markerColor="black"
                ticksCount={6}
              />
            </div>
          )}
          {solarEnabled && (
            <div className={`solar-potential-legend floating-legend ${mobileCollapsedClass}`}>
              <div className="legend-header">
                {__('legends.solarpotential')}<small> (W/m<span className="sup">2</span>)</small>
              </div>
              <HorizontalColorbar
                id="solar-potential-bar"
                colorScale={solarColor}
                currentValue={solarColorbarValue}
                markerColor="red"
                ticksCount={5}
              />
            </div>
          )}
          <div className={`co2-legend floating-legend ${mobileCollapsedClass}`}>
            <div className="legend-header">
              <span dangerouslySetInnerHTML={{ __html: co2Sub(__('legends.carbonintensity')) }} />
              <small> (gCO<span className="sub">2</span>eq/kWh)</small>
            </div>
            <HorizontalColorbar
              id="carbon-intensity-bar"
              colorScale={getCo2Scale(colorBlindModeEnabled)}
              currentValue={co2ColorbarValue}
              markerColor="white"
              ticksCount={5}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Legend);
