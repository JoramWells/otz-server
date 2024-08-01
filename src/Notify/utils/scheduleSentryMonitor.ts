import * as schedule from 'node-schedule'
import Sentry from '../config/sentryInit'

const scheduleWithCHeckIn = Sentry.cron.instrumentNodeSchedule(schedule)


function scheduleTask(taskName: string, cronString: string, task:()=>{}){
return scheduleWithCHeckIn.scheduleJob(taskName, cronString,()=>task);

}

export {scheduleTask}
