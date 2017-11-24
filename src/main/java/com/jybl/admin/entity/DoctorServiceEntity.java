package com.jybl.admin.entity;

import java.io.Serializable;

/**

create table doctor_service(
id int auto_increment,
doctor_phone varchar(32) not null,
service_id int not null,
service_name  varchar(128) not null,
service_price varchar(32) not null,
service_count int  not null,
service_duration varchar(32) not null,
added_time varchar(32) not null,
added_status int default 0,
primary key (id)
)engine=INNODB default charset=utf8;

 **/

public class DoctorServiceEntity implements Serializable {
    private Long id;
    private String doctor_phone;
    private Long service_id;
    private String service_name;
    private String service_price;
    private Integer service_count;
    private String service_duration;
    private String added_time;
    private int added_status;

    private int status;

    private String kind;
    private Integer purchased_count = 0;

    private Long rid;


    public DoctorServiceEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDoctor_phone() {
        return doctor_phone;
    }

    public void setDoctor_phone(String doctor_phone) {
        this.doctor_phone = doctor_phone;
    }

    public Long getService_id() {
        return service_id;
    }

    public void setService_id(Long service_id) {
        this.service_id = service_id;
    }

    public String getService_name() {
        return service_name;
    }

    public void setService_name(String service_name) {
        this.service_name = service_name;
    }

    public String getService_price() {
        return service_price;
    }

    public void setService_price(String service_price) {
        this.service_price = service_price;
    }

    public Integer getService_count() {
        return service_count;
    }

    public void setService_count(Integer service_count) {
        this.service_count = service_count;
    }

    public String getService_duration() {
        return service_duration;
    }

    public void setService_duration(String service_duration) {
        this.service_duration = service_duration;
    }

    public String getAdded_time() {
        return added_time;
    }

    public void setAdded_time(String added_time) {
        this.added_time = added_time;
    }

    public int getAdded_status() {
        return added_status;
    }

    public void setAdded_status(int added_status) {
        this.added_status = added_status;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public Integer getPurchased_count() {
        return purchased_count;
    }

    public void setPurchased_count(Integer purchased_count) {
        this.purchased_count = purchased_count;
    }

    public Long getRid() {
        return rid;
    }

    public void setRid(Long rid) {
        this.rid = rid;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
