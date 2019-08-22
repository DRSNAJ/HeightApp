    let degtorad = Math.PI / 180; // Degree-to-Radian conversion
    let radtodeg = 1//180// / Math.PI; // Radian-to-Degree conversion

    let errorRef = document.getElementsByClassName("error");
    // Given an HTML element class and a boolean representing
    // whether those elements should be displayed, this function
    // hides/shows all elements with that class.
    function displayElementsWithClass(className, display)
    {
        let elements = document.getElementsByClassName(className);

        for (let i = 0; i < elements.length; i++)
        {
            if (display)
            {
                elements[i].style.display = "block";
            }
            else
            {
                elements[i].style.display = "none";
            }
        }
    }

    // Start: code for accelerometer

    //variable to store the object if sensor is available
    let accelerometer = null;
    // try-catch: exception handling
    try
    {
        // initialising object for Accelerometer
        accelerometer = new Accelerometer({ frequency: 10 });

        //if sensor is available but there is problem in using it
        accelerometer.addEventListener('error', event => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError')
        {
          errorRef.innerText = "Permission to access sensor was denied.";
        }
        else if (event.error.name === 'NotReadableError' )
        {
          errorRef.innerText = "Cannot connect to the sensor.";
        }});

        // when sensor has a reading, call the function
        accelerometer.addEventListener('reading', () => reloadAccelerometerValues(accelerometer));

        //start the sensor
        accelerometer.start();
    }
    catch (error)
    {
      // Handle construction errors.
      let errorText = "";
      if (error.name === 'SecurityError')
      {
        errorText = "Sensor construction was blocked by the Feature Policy.";
      }
      else if (error.name === 'ReferenceError')
      {
        errorText =" Sensor is not supported by the User Agent.";
      }
      else
      {
        errorText = "Sensor not supported";
      }
      errorRef.innerText = errorText;
    }

    // function to print value on the webpage
    function reloadAccelerometerValues(accelerometer){

      let x = accelerometer.x;
      let y = accelerometer.y;
      let z = accelerometer.z;

      document.getElementById("aX").innerText = x.toFixed(2);
      document.getElementById("aY").innerText = y.toFixed(2);
      document.getElementById("aZ").innerText = z.toFixed(2);
      document.getElementById("activated").innerText = accelerometer.activated;
      document.getElementById("hasReading").innerText = accelerometer.hasReading;
    }
    // end: code for accelerometer

    // Start: code for device orientation

    let deviceAbsolute = null;
    // try-catch: exception handling
    try
    {
        // initialising object for device orientation
        deviceAbsolute = new AbsoluteOrientationSensor({ frequency: 10 });

        //if sensor is available but there is problem in using it
        deviceAbsolute.addEventListener('error', event => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError')
        {
          errorRef.innerText ="Permission to access sensor was denied.";
        }
        else if (event.error.name === 'NotReadableError' )
        {
          errorRef.innerText = "Cannot connect to the sensor.";
        }});
        // when sensor has a reading, call the function
        deviceAbsolute.addEventListener('reading', () => reloadOrientationValues(deviceAbsolute));

        //start the sensor
        deviceAbsolute.start();
    }
    catch (error)
    {
    // Handle construction errors.
      let errorText = "";
      if (error.name === 'SecurityError')
      {
        errorText = "Sensor construction was blocked by the Feature Policy.";
      }
      else if (error.name === 'ReferenceError')
      {
        errorText =" Sensor is not supported by the User Agent.";
      }
      else
      {
        errorText = "Sensor not supported";
      }
      errorRef.innerText = errorText;
    }

    let  betaVec = [];
    let alphaVec = [];
    let gammaVec = [];
    let xVec = [];
    let yVec = [];
    let zVec = [];
    let wVec = [];  

    // function to print value on the webpage
    function reloadOrientationValues(deviceAbsolute)
    {
	let x = deviceAbsolute.quaternion[0];
	let y = deviceAbsolute.quaternion[1];
	let z = deviceAbsolute.quaternion[2];
	let w = deviceAbsolute.quaternion[3];
	let data = [];
	data[0] = Math.atan2(2*(w*x + y*z), 1 - 2*(Math.pow(x,2)+Math.pow(y,2)));
	data[1] = Math.asin(2*(w*y - x*z));
	data[2] = Math.atan2(2*(w*z + x*y),1 - 2*(Math.pow(y,2)+Math.pow(z,2)));
	//console.log(data);
        
        betaVec.push(Number(data[0]*(180/Math.PI)));
        alphaVec.push(Number(data[1]*(180/Math.PI)));
        gammaVec.push(Number(data[2]*(180/Math.PI)));
        

        xVec.push(Number(((deviceAbsolute.quaternion[0])).toFixed(2)));
        yVec.push(Number(((deviceAbsolute.quaternion[1])).toFixed(2)));
        zVec.push(Number(((deviceAbsolute.quaternion[2])).toFixed(2)));
        wVec.push(Number(((deviceAbsolute.quaternion[3])).toFixed(2)));
        
        if (betaVec.length==10)
            {
                let betaSum = (betaVec.reduce((a,b)=>a+b,0))/10;
                let alphaSum = (alphaVec.reduce((a,b)=>a+b,0))/10;
                let gammaSum = (gammaVec.reduce((a,b)=>a+b,0))/10;
                
               let xSum = (xVec.reduce((a,b)=>a+b,0))/10;
               let ySum = (yVec.reduce((a,b)=>a+b,0))/10;
               let zSum = (zVec.reduce((a,b)=>a+b,0))/10;
               let wSum = (wVec.reduce((a,b)=>a+b,0))/10;
                
                document.getElementById("bValue").innerText = betaSum.toFixed(2);
                document.getElementById("aValue").innerText = alphaSum.toFixed(2);
                document.getElementById("gValue").innerText = gammaSum.toFixed(2);
                document.getElementById("q0Value").innerText = xSum.toFixed(2);
                document.getElementById("q1Value").innerText = ySum.toFixed(2);
                document.getElementById("q2Value").innerText = zSum.toFixed(2);
                document.getElementById("q3Value").innerText = wSum.toFixed(2);
             
                 betaVec = [];
                 alphaVec = [];
                 gammaVec = [];
                 xVec = [];
                 yVec = [];
                 zVec = [];
                 wVec = [];  
                   
            }
     
        document.getElementById("mActivated").innerText = deviceAbsolute.activated;
        document.getElementById("mHasReading").innerText = deviceAbsolute.hasReading;
 }


function heightInput()
{
    let userInput = prompt('Please insert your height:');
    document.getElementById('heightOfCamera').innerText = userInput;
}
      
