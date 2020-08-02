import React, { useEffect, useState } from 'react';
import CustomButton from './customButton';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TimerIcon from '@material-ui/icons/Timer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles =  makeStyles((theme) => ({  
  snackbarStyle: {
    color: "white",
		alignSelf: "center",
		display: "inline-flex",
    backgroundColor: '#F55448',
		width: '100%',
		marginTop: '10px',
	},
	iconStyle: {
		alignSelf: "center",
	},
	root: {
		display: "inline-flex",
	},
	cardStyle: {
		paddingBottom: 0,
	},
	timerStyle: {
		display: "inline-block",
	}
}));

function TestsTimer(props){
	const classes = useStyles();

	var [timerStart, setTimerStart] = useState(false);
	var [duration, setDuration] = useState(props.duration);
	var [timerEnd, setTimerEnd] = useState(false);

	function ResetTimer(){
		setTimerStart(false);
		setDuration(props.duration);
		setTimerEnd(false);
	}

	useEffect(() => {
		let interval = null;
		if (timerStart && duration>0) {
			interval = setInterval(() => {
				setDuration(duration => duration - 1);
			}, 1000);
		} else if (!timerStart && duration === 0) {
			clearInterval(interval);				
		}else if(timerStart && duration ===0){
			setTimerEnd(true);
		}
		return () => clearInterval(interval);
	}, [timerStart, duration]);

	return(
		<div className={classes.timerStyle}>
			<Card className={classes.root}>
				<CardContent className={classes.cardStyle}>
					<Typography gutterBottom variant="h5" component="h3"> Tiempo: {duration} segundos </Typography>
					{!timerEnd ?
						<CustomButton
							msj={!timerStart ? "Iniciar" : "Detener"}
							callback={()=>setTimerStart(!timerStart)}
						></CustomButton>
					:
						<CustomButton
							msj="Reiniciar"
							callback={()=>ResetTimer()}
						></CustomButton>
					}
				</CardContent>	
			</Card>
			{timerEnd ? 
				<Grid container  className={classes.snackbarStyle} justify="center">
					<TimerIcon className={classes.iconStyle}/>
					<p> El tiempo ha terminado</p>
				</Grid>
			:
				<div/>
			}
		</div>
	)
}


export default TestsTimer;