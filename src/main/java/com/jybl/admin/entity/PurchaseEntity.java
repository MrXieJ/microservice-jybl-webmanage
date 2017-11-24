package com.jybl.admin.entity;

import java.io.Serializable;

public class PurchaseEntity implements Serializable {
    private int id;//订单id
    private String purchased_time;//购买时间
    private String indent_number;//订单编号
    private int indent_status;//订单状态
    private String doctor_phone;//医生电话
    private String doctor_name;//医生姓名
    private String  wechat_id;//患者微信id
    private String  patient_name;//患者姓名
    private String  patient_phone;//患者电话
    private int service_id;//服务包id
    private String name;//购买的服务名称
    private String duration;//服务期限
    private int sum_count;//服务总次数
    private int left_count;//服务剩余次数
    private String price; //服务价格
    private String content;//服务内容
    private String kind;//适用人群
    private int risk_level_id;//风险概率



    public PurchaseEntity() {
    }

    public PurchaseEntity(int id, String purchased_time, String indent_number, int indent_status, String doctor_phone, String doctor_name, String wechat_id, String patient_name, String patient_phone, int service_id, String name, String duration, int sum_count, int left_count, String price, String content, String kind, int risk_level_id) {
        this.id = id;
        this.purchased_time = purchased_time;
        this.indent_number = indent_number;
        this.indent_status = indent_status;
        this.doctor_phone = doctor_phone;
        this.doctor_name = doctor_name;
        this.wechat_id = wechat_id;
        this.patient_name = patient_name;
        this.patient_phone = patient_phone;
        this.service_id = service_id;
        this.name = name;
        this.duration = duration;
        this.sum_count = sum_count;
        this.left_count = left_count;
        this.price = price;
        this.content = content;
        this.kind = kind;
        this.risk_level_id = risk_level_id;
    }

    public String getWechat_id() {
        return wechat_id;
    }

    public void setWechat_id(String wechat_id) {
        this.wechat_id = wechat_id;
    }


    public int getSum_count() {
        return sum_count;
    }

    public void setSum_count(int sum_count) {
        this.sum_count = sum_count;
    }

    public int getLeft_count() {
        return left_count;
    }

    public void setLeft_count(int left_count) {
        this.left_count = left_count;
    }

    public String getPurchased_time() {
        return purchased_time;
    }

    public void setPurchased_time(String purchased_time) {
        this.purchased_time = purchased_time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIndent_number() {
        return indent_number;
    }

    public void setIndent_number(String indent_number) {
        this.indent_number = indent_number;
    }

    public int getIndent_status() {
        return indent_status;
    }

    public void setIndent_status(int indent_status) {
        this.indent_status = indent_status;
    }

    public String getDoctor_phone() {
        return doctor_phone;
    }

    public void setDoctor_phone(String doctor_phone) {
        this.doctor_phone = doctor_phone;
    }

    public String getDoctor_name() {
        return doctor_name;
    }

    public void setDoctor_name(String doctor_name) {
        this.doctor_name = doctor_name;
    }

    public String getPatient_name() {
        return patient_name;
    }

    public void setPatient_name(String patient_name) {
        this.patient_name = patient_name;
    }

    public String getPatient_phone() {
        return patient_phone;
    }

    public void setPatient_phone(String patient_phone) {
        this.patient_phone = patient_phone;
    }

    public int getService_id() {
        return service_id;
    }

    public void setService_id(int service_id) {
        this.service_id = service_id;
    }

    public int getRisk_level_id() {
        return risk_level_id;
    }

    public void setRisk_level_id(int risk_level_id) {
        this.risk_level_id = risk_level_id;
    }
}
