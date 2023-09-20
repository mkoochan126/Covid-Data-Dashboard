package com.example.covid19api.Controller;
import com.example.covid19api.Executor.Covid19ExecutorImpl;
import com.example.covid19api.DTO.CovidData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import java.text.ParseException;

@RestController
@RequestMapping("/covid19")
public class Covid19ControllerImpl implements Covid19Controller{

    @Autowired
    public Covid19ControllerImpl() {
    }

    Covid19ExecutorImpl covid19Executor = new Covid19ExecutorImpl();

    @GetMapping("/az/{currentDate}")
    @Override
    public List<CovidData> getArizonaCovidWeekData(@PathVariable("currentDate") String currentDate) throws ParseException {

        return covid19Executor.fetchArizonaCovidWeekData(currentDate);
        
    }


    @PostMapping("/{state}/{start}/{end}")
    @Override
    public List<CovidData> getStateDataByPeriod(@PathVariable("state") String state,@PathVariable("start") String startDate,@PathVariable("end") String endDate) throws ParseException {
        
        return covid19Executor.fetchStateCovidDataByPeriod(state,startDate,endDate);
    }
}
