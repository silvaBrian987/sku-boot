package net.bgsystems.sku.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;

@Configuration
//@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //super.configure(auth);

        //auth.jdbcAuthentication().dataSource(null).usersByUsernameQuery("").authoritiesByUsernameQuery("");
        auth.jdbcAuthentication().usersByUsernameQuery("select name, password, enabled from usuarios where name = ?").authoritiesByUsernameQuery("select roles from usuarios where name = ?");

        //auth.inMemoryAuthentication().withUser("brian").password("{noop}brian").authorities("USER");
        //auth.inMemoryAuthentication().withUser("admin").password("{noop}admin123").authorities("USER", "ADMIN");

        //auth.inMemoryAuthentication().withUser("brian").password(passwordEncoder().encode("brian")).authorities("USER");
   }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new Pbkdf2PasswordEncoder();
    }
}
