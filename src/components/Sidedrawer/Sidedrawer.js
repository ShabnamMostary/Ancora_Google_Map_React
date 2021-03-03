import React from 'react';
import './Sidedrawer.css'
import classNames from 'classnames'

const Sidedrawer = (props) => {
  //destructure
  const { trials, selectedTrial, setSelectedTrial } = props;
 // console.log(selectedTrial)
  return (
    <div className='sidedrawer'>
      {trials.map((trialData, index) => {
        const { trial_name, trial_phase, recruiting_status, trial_id } = trialData;
        //rename trial id to selected_trial_id for styling the selected trial differently
        const { trial_id:selected_trial_id }  = selectedTrial

          return (
            <div onClick={()=> setSelectedTrial(trialData)} key={index} className={classNames('trialcontainer', {'selectedTrial':selected_trial_id===trial_id})}>
              <ul>
              <li>{trial_name}</li>
              <li> <span>Phase: </span> {trial_phase}</li>
              <li><span>Status: </span>{recruiting_status}</li>
              </ul>
            </div>
          );
       }
      )}
    </div>
  )
};

export default Sidedrawer;
