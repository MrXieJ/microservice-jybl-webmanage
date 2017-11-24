package com.jybl.admin.database;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.druid.pool.DruidDataSource;

@Configuration 
public class DruidDataSourceConfig {

	@Bean
	@ConfigurationProperties(prefix = "spring.datasource")//把同类的配置信息自动封装成实体类
	public DataSource druidDataSource(){
	DruidDataSource druidDataSource = new DruidDataSource();
	return druidDataSource;
	}
}
