import React from 'react';
import fullBody from '../assets/BodyScaled.png';
import { useNavigate } from 'react-router-dom';

const Body = ({ onMuscleSelect }) => {  // TODO: rename to BodyMap for clarity
  const navigate = useNavigate();

  const handleAreaClick = (muscleName) => {
    onMuscleSelect(muscleName);
    navigate('/questionnaire', { state: { muscleName } });
  };

  return (
    <div className="body-container">
      <style>
        {`
          .body-container {
            position: relative;
          }

          area {
            cursor: pointer;
          }

          area:hover::after {
            content: attr(title);
            margin-top:50px;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            color: #333;
            font-size: 15px;
            z-index: 10;
            pointer-events: none;
            transform: translate(-50%, -100%);
            white-space: nowrap;
            box-shadow: 0 0 10px 2px rgba(255, 255, 0, 0.7);
          }

          .body-container area:hover::after {
            display: block;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          }

          
        `}
      </style>
      <img src={fullBody} useMap="#image-map" className="body-image"/>
      <map name="image-map">

              <area target="" alt="Chest" title="Chest" href="" coords="61,240,70,232,102,221,150,221,164,225,190,238,195,256,183,286,156,297,124,286,108,292,102,295,96,295,87,295,79,291,73,288,68,281,61,274,55,262,53,253" shape="poly"
               onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Chest');
              }}/>
              <area target="" alt="Shoulders" title="Shoulders" href="" coords="41,215,24,226,18,241,18,253,19,268,24,280,50,251,78,218" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Shoulders');
              }}/>
              <area target="" alt="Traps" title="Traps" href="" coords="57,207,79,214,91,198,97,184" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Traps');
              }}/>
              <area target="" alt="Traps" title="Traps" href="" coords="151,181,172,195,187,204,181,211,166,215,156,203" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Traps');
              }}/>
              <area target="" alt="Shoulders" title="Shoulders" href="" coords="174,217,211,215,226,226,229,241,230,262,222,284" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Shoulders');
              }}/>
              <area target="" alt="Biceps" title="Biceps" href="" coords="45,265,30,277,27,308,31,338,44,360,53,313,54,289,53,277" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Biceps');
              }}/>
              <area target="" alt="Biceps" title="Biceps" href="" coords="200,262,193,280,192,295,191,314,197,329,202,347,208,346,216,330,222,309,219,284" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Biceps');
              }}/>
              <area target="" alt="Triceps" title="Triceps" href="" coords="291,255,277,269,269,278,268,312,287,325,299,342,305,276" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Triceps');
              }}/>
              <area target="" alt="Triceps" title="Triceps" href="" coords="457,261,450,274,446,291,446,315,450,331,452,342,468,318,478,314,480,287,470,271" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Triceps');
              }}/>
              <area target="" alt="Forearms" title="Forearms" href="" coords="47,361,11,345,11,411,40,412" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Forearms');
              }}/>
              <area target="" alt="Forearms" title="Forearms" href="" coords="239,346,203,364,217,411,241,406,243,376" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Forearms');
              }}/>
              <area target="" alt="Wrists" title="Wrists" href="" coords="12,415,36,417,31,430,12,431" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Wrists');
              }}/>
              <area target="" alt="Wrists" title="Wrists" href="" coords="213,413,240,410,239,427,218,428" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Wrists');
              }}/>
              <area target="" alt="Abs" title="Abs" href="" coords="157,301,127,289,96,300,93,378,154,378" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Abs');
              }}/>
              <area target="" alt="FrontThigh" title="Front Thigh" href="" coords="58,437,120,474,106,563,53,536,48,491" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('FrontThigh');
              }}/>
              <area target="" alt="FrontThigh" title="Front Thigh" href="" coords="131,472,192,439,197,469,197,492,197,514,194,539,189,557,139,564,131,510" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('FrontThigh');
              }}/>
              <area target="" alt="Shin" title="Shin" href="" coords="55,626,101,623,105,649,96,675,93,692,64,694,54,661" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Shin');
              }}/>
              <area target="" alt="Shin" title="Shin" href="" coords="141,623,184,623,186,648,183,666,176,689,143,693,134,648" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Shin');
              }}/>
              <area target="" alt="UpperBack" title="Upper Back" href="" coords="320,224,296,246,293,251,309,284,314,328,381,321,436,321,445,278,452,263,453,250,446,242,429,229,377,222" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('UpperBack');
              }}/>
              <area target="" alt="LowerBack" title="Lower Back" href="" coords="314,329,433,329,431,351,431,376,398,383,374,385,354,386,336,379,320,380,314,383" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('LowerBack');
              }}/>
              <area target="" alt="Glutes" title="Glutes" href="" coords="333,386,324,406,316,432,313,445,324,466,343,471,358,465,372,451,382,456,392,465,416,471,428,462,432,450,429,435,426,410,420,395,415,385" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Glutes');
              }}/>
              <area target="" alt="Calves" title="Calves" href="" coords="327,573,319,610,318,631,322,663,335,670,351,669,360,651,361,638,350,607" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Calves');
              }}/>
              <area target="" alt="Calves" title="Calves" href="" coords="420,567,410,588,404,612,397,636,397,657,402,668,417,666,428,666,442,654,444,632" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Calves');
              }}/>
              <area target="" alt="Hamstrings" title="Hamstrings" href="" coords="331,475,322,504,323,527,329,553,339,577,350,591,356,571,353,535,355,510,352,486,352,474" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Hamstrings');
              }}/>
              <area target="" alt="Hamstrings" title="Hamstrings" href="" coords="415,479,391,480,395,532,399,564,400,584,421,559,428,533,428,504,434,485" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Hamstrings');
              }}/>
              <area target="" alt="Neck" title="Neck" href="" coords="100,170,111,176,119,180,130,180,142,175,149,167,150,191,156,209,145,211,129,213,108,212,90,206" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Neck');
              }}/>
              <area target="" alt="Neck" title="Neck" href="" coords="350,151,369,148,387,150,399,148,397,172,397,184,405,191,414,193,390,195,363,193,348,192,331,195,350,178,349,161" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Neck');
              }}/>
              <area target="" alt="Shoulders" title="Shoulders" href="" coords="283,216,317,225,304,235,292,245,286,252,281,260,272,269,267,259,268,245,271,233" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Shoulders');
              }}/>
              <area target="" alt="Shoulders" title="Shoulders" href="" coords="432,223,463,217,470,225,477,237,482,259,476,274" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Shoulders');
              }}/>
              <area target="" alt="Traps" title="Traps" href="" coords="328,193,315,203,298,211,311,214,338,211,341,199" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Traps');
              }}/>
              <area target="" alt="Traps" title="Traps" href="" coords="414,194,425,199,445,210,421,212,406,211,406,202" shape="poly"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('Traps');
              }}/>
      </map>
    </div>
  );
};

export default Body;