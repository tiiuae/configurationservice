package com.adminconsole.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ArpDTO {

    private String ip;

    private String mac;
    String type;
    private String status;

}
