package com.jybl.admin.entity;

import java.io.Serializable;

public class HealthEntity implements Serializable {

    private String wechat_id;//患者微信id
    private float height;//身高
    private float weight;//体重
    private String diabetes;//糖尿病
    private String chd;//冠心病
    private String stroke;//脑卒中
    private String hypertension;//高血压
    private String other_history;//替他病史
    private String family_history;//家族病史
    private String smoke;//吸烟
    private String smoking;//吸烟量
    private String drink;//喝酒
    private String drinking;//和酒量

    public HealthEntity() {
    }

    public HealthEntity(String wechat_id, float height, float weight, String diabetes, String chd, String stroke, String hypertension, String other_history, String family_history, String smoke, String smoking, String drink, String drinking) {
        this.wechat_id = wechat_id;
        this.height = height;
        this.weight = weight;
        this.diabetes = diabetes;
        this.chd = chd;
        this.stroke = stroke;
        this.hypertension = hypertension;
        this.other_history = other_history;
        this.family_history = family_history;
        this.smoke = smoke;
        this.smoking = smoking;
        this.drink = drink;
        this.drinking = drinking;
    }

    public String getWechat_id() {
        return wechat_id;
    }

    public void setWechat_id(String wechat_id) {
        this.wechat_id = wechat_id;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public String getDiabetes() {
        return diabetes;
    }

    public void setDiabetes(String diabetes) {
        this.diabetes = diabetes;
    }

    public String getChd() {
        return chd;
    }

    public void setChd(String chd) {
        this.chd = chd;
    }

    public String getStroke() {
        return stroke;
    }

    public void setStroke(String stroke) {
        this.stroke = stroke;
    }

    public String getHypertension() {
        return hypertension;
    }

    public void setHypertension(String hypertension) {
        this.hypertension = hypertension;
    }

    public String getOther_history() {
        return other_history;
    }

    public void setOther_history(String other_history) {
        this.other_history = other_history;
    }

    public String getFamily_history() {
        return family_history;
    }

    public void setFamily_history(String family_history) {
        this.family_history = family_history;
    }

    public String getSmoke() {
        return smoke;
    }

    public void setSmoke(String smoke) {
        this.smoke = smoke;
    }

    public String getSmoking() {
        return smoking;
    }

    public void setSmoking(String smoking) {
        this.smoking = smoking;
    }

    public String getDrink() {
        return drink;
    }

    public void setDrink(String drink) {
        this.drink = drink;
    }

    public String getDrinking() {
        return drinking;
    }

    public void setDrinking(String drinking) {
        this.drinking = drinking;
    }
}
