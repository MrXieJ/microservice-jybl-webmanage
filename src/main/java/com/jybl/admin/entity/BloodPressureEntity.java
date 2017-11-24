package com.jybl.admin.entity;

import java.io.Serializable;

public class BloodPressureEntity implements Serializable {
    private String wechat_id;//患者微信号id
    private String date;//日期
    private String time;//时间
    private String systolic_pressure;//收缩压
    private String diastolic_pressure;//舒张压
    private String rhr;//静息心率

    public BloodPressureEntity() {
    }

    public BloodPressureEntity(String wechat_id, String date, String time, String systolic_pressure, String diastolic_pressure, String rhr) {
        this.wechat_id = wechat_id;
        this.date = date;
        this.time = time;
        this.systolic_pressure = systolic_pressure;
        this.diastolic_pressure = diastolic_pressure;
        this.rhr = rhr;
    }

    public String getWechat_id() {
        return wechat_id;
    }

    public void setWechat_id(String wechat_id) {
        this.wechat_id = wechat_id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getSystolic_pressure() {
        return systolic_pressure;
    }

    public void setSystolic_pressure(String systolic_pressure) {
        this.systolic_pressure = systolic_pressure;
    }

    public String getDiastolic_pressure() {
        return diastolic_pressure;
    }

    public void setDiastolic_pressure(String diastolic_pressure) {
        this.diastolic_pressure = diastolic_pressure;
    }

    public String getRhr() {
        return rhr;
    }

    public void setRhr(String rhr) {
        this.rhr = rhr;
    }
}
