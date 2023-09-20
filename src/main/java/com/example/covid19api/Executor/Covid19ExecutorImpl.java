package com.example.covid19api.Executor;


import com.example.covid19api.DTO.CovidData;
import com.example.covid19api.DataService.CovidDataServiceImpl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Calendar;
import java.util.List;
import java.util.Collections;


public class Covid19ExecutorImpl implements Covid19Executor{

    private CovidDataServiceImpl covidDataService = new CovidDataServiceImpl();

    private final SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");

    @Override
    public List<CovidData> fetchArizonaCovidWeekData(String endDate){

        Calendar calendar = Calendar.getInstance();
        Date startDate = null;
        try {
            calendar.setTime(df.parse(endDate));
            calendar.add(Calendar.DAY_OF_MONTH, -6);
            startDate = calendar.getTime();

        } catch (ParseException e) {
            e.printStackTrace();
        }
        return fetchStateCovidDataByPeriod("az", df.format(startDate), endDate);
    }

    @Override
    public List<CovidData> fetchStateCovidDataByPeriod(String state,String startDate,String endDate){

        List<CovidData> cdL = new ArrayList<>();
        try {
            Date start = df.parse(startDate);
            Date end = df.parse(endDate);
            List<CovidData> cdList = covidDataService.fetchCovidDataForState(state);
            for(CovidData cd : cdList){
                Date d = df.parse(cd.getDate());
                if(d.compareTo(start)>=0 && d.compareTo(end)<=0){
                    cdL.add(cd);
                }
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Collections.reverse(cdL);

        return cdL;
    }
    
}
