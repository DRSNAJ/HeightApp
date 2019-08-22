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
        

      
        
        if (betaVec.length==10)
            {
                let betaSum = (betaVec.reduce((a,b)=>a+b,0))/10;
                let alphaSum = (alphaVec.reduce((a,b)=>a+b,0))/10;
                let gammaSum = (gammaVec.reduce((a,b)=>a+b,0))/10;
                
                
                document.getElementById("bValue").innerText = betaSum.toFixed(2);
                document.getElementById("aValue").innerText = alphaSum.toFixed(2);
                document.getElementById("gValue").innerText = gammaSum.toFixed(2);
               
             
                 betaVec = [];
                 alphaVec = [];
                 gammaVec = [];
                
            }
     
        document.getElementById("mActivated").innerText = deviceAbsolute.activated;
        document.getElementById("mHasReading").innerText = deviceAbsolute.hasReading;
 }


function heightInput()
{
    let userInput = prompt('Please insert your height:');
    document.getElementById('heightOfCamera').innerText = userInput;
}
      
